import request from 'supertest';
import { app, server } from '../index';
import { prisma } from '@ntla9aw/db';
import { sign } from 'jsonwebtoken';

describe('API Routes', () => {
  let adminToken: string;
  let memberToken: string;
  let testUserId: string;
  let testCommunityId: string;

  beforeAll(async () => {
    // Create test users and generate tokens
    const adminUser = await prisma.user.create({
      data: {
        uid: 'admin-uid', // Add a unique identifier for the admin user
        name: 'Admin User',
        Credentials: {
          create: {
            email: 'admin@test.com',
            passwordHash: 'hashed_password',
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
        Admin: {
          create: {},
        },
      },
      include: {
        Credentials: true,
        AuthProvider: true,
        Admin: true,
      },
    });
    
    const memberUser = await prisma.user.create({
      data: {
        uid: 'member-uid', // Add a unique identifier for the member user
        name: 'Member User',
        Credentials: {
          create: {
            email: 'member@test.com',
            passwordHash: 'hashed_password',
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
        Member: {
          create: {},
        },
      },
      include: {
        Credentials: true,
        AuthProvider: true,
        Member: true,
      },
    });
  
    testUserId = memberUser.uid;
  
    adminToken = sign({ uid: adminUser.uid }, process.env.NEXTAUTH_SECRET || '');
    memberToken = sign({ uid: memberUser.uid }, process.env.NEXTAUTH_SECRET || '');
  
    // Create a test community
    const testCommunity = await prisma.community.create({
      data: {
        name: 'Test Community',
        description: 'A test community',
        uid: memberUser.uid,
      },
    });
  
    testCommunityId = testCommunity.community_id;
  });
  
  afterAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: {
        Credentials: {
          email: {
            in: ['admin@test.com', 'member@test.com'],
          },
        },
      },
    });
  
    // await prisma.community.delete({
    //   where: {
    //     community_id: testCommunityId,
    //   },
    // });
  
    await prisma.$disconnect();
    server.close();
  });

  describe('Auth Routes', () => {
    it('should get all users (admin only)', async () => {
      const response = await request(app)
        .get('/trpc/auth.users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.result.data).toBeDefined();
      expect(Array.isArray(response.body.result.data)).toBe(true);
    });

    it('should not allow non-admin to get all users', async () => {
      const response = await request(app)
        .get('/trpc/auth.users')
        .set('Authorization', `Bearer ${memberToken}`);

      expect(response.status).toBe(403);
    });

    it('should get a specific user (admin only)', async () => {
      const response = await request(app)
        .get(`/trpc/auth.user?input=${JSON.stringify({ uid: testUserId })}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.result.data).toBeDefined();
      expect(response.body.result.data.uid).toBe(testUserId);
    });

    it('should sign in a user', async () => {
      const response = await request(app)
        .post('/trpc/auth.signIn')
        .send({
          email: 'member@test.com',
          password: 'hashed_password',
        });

      expect(response.status).toBe(200);
      expect(response.body.result.data.token).toBeDefined();
      expect(response.body.result.data.user).toBeDefined();
    });

    it('should register a new user with credentials', async () => {
      const response = await request(app)
        .post('/trpc/auth.registerWithCredentials')
        .send({
          email: 'newuser@test.com',
          name: 'New User',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.result.data.token).toBeDefined();
      expect(response.body.result.data.user).toBeDefined();

      // Clean up the created user
      await prisma.credentials.delete({
        where: { email: 'newuser@test.com' },
      });
      await prisma.user.delete({
        where: { uid: response.body.result.data.user.uid },
      });
    });

    it('should get user roles', async () => {
      const response = await request(app)
        .get('/trpc/auth.roles')
        .set('Authorization', `Bearer ${memberToken}`);

      expect(response.status).toBe(200);
      expect(response.body.result.data).toBeDefined();
      expect(Array.isArray(response.body.result.data)).toBe(true);
    });
  });

  describe('Community Routes', () => {
    it('should get all communities', async () => {
      const response = await request(app)
        .get('/trpc/community.commnunities');

      expect(response.status).toBe(200);
      expect(response.body.result.data).toBeDefined();
      expect(Array.isArray(response.body.result.data)).toBe(true);
    });

    it('should get a specific community', async () => {
      const response = await request(app)
        .get(`/trpc/community.community?input=${JSON.stringify({ community_id: testCommunityId })}`);

      expect(response.status).toBe(200);
      expect(response.body.result.data).toBeDefined();
      expect(response.body.result.data.community_id).toBe(testCommunityId);
    });

    // it('should get the owner\'s community', async () => {
    //   const response = await request(app)
    //     .get('/trpc/community.owner')
    //     .set('Authorization', `Bearer ${adminToken}`);

    //   expect(response.status).toBe(200);
    //   expect(response.body.result.data).toBeDefined();
    //   expect(response.body.result.data.uid).toBe('member-test-uid');
    // });

    // it('should create a new community', async () => {
    //   const newCommunity = {
    //     name: 'New Test Community',
    //     description: 'A new test community',
    //     uid: 'member-test-uid',
    //     tags: [{ name: 'test-tag' }],
    //   };

    //   const response = await request(app)
    //     .post('/trpc/community.create')
    //     .set('Authorization', `Bearer ${adminToken}`)
    //     .send(newCommunity);

    //   expect(response.status).toBe(200);
    //   expect(response.body.result.data.message).toBe('Community created successfully');
    //   expect(response.body.result.data.community).toBeDefined();

    //   // Clean up the created community
    //   await prisma.community.delete({
    //     where: { community_id: response.body.result.data.community.community_id },
    //   });
    // });
  });
});