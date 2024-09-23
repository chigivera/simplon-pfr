// routes/subscription.ts
import { TRPCError } from '@trpc/server';
import { t } from '../trpc';
import { createCheckoutSession, updateUserRole } from '../utils';
import { formSchemaSubscription } from '@ntla9aw/forms/src/schemas';

export const subscriptionRoutes = t.router({
  create: t.procedure
    .input(formSchemaSubscription)
    .mutation(async ({ input }) => {
      const { uid, product } = input;
      if(product === "member") return;
      // Map product to Stripe price ID
      const priceIdMap: Record<string, string> = {
        member: process.env.STRIPE_MEMBER_PRICE_ID || '',
        individual: process.env.STRIPE_INDIVIDUAL_PRICE_ID || '',
        organization: process.env.STRIPE_ORGANIZATION_PRICE_ID || '',
      };

      const priceId = priceIdMap[product];

      if (!priceId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid product selected.',
        });
      }

      // Create a checkout session
      const session = await createCheckoutSession(priceId, uid || '');

      // Optionally update user role immediately or after checkout completion
      await updateUserRole(uid || '', product);

      return { sessionId: session.url };
    }),
});