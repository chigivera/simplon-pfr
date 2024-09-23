"use client";

import { useState, useEffect } from "react";
import { Button, Input, Form, Upload, Image, DatePicker, Select } from "antd";
import { Controller } from "react-hook-form";
import { userFormEvent } from "@ntla9aw/forms/src/event";
import CustomButton from "../atoms/Button";
import { Typography } from "antd";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EventForm = ({ title }: { title: string }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = userFormEvent();
  const [cities, setCities] = useState<{ name: string; id: string; longitude: number | null; latitude: number | null; }[]>([]);
  const { data: userData, status } = useSession();
  const { mutateAsync } = trpcClient.event.create.useMutation();
  const { mutateAsync: fetchCommunity } = trpcClient.community.owner.useMutation();
  const { data: citiesData } = trpcClient.navigation.cities.useQuery();
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (citiesData) {
      setCities(citiesData); // Assuming citiesData is an array of city objects
    }
  }, [citiesData]);
  useEffect(() => {
    const getCommunity = async () => {
      if (userData?.user?.uid) {
        try {
          const community = await fetchCommunity({ uid: userData.user.uid });
          setCommunityId(community.community_id);
        } catch (error) {
          console.error("Error fetching community:", error);
        }
      }
    };
  
 
  
    getCommunity();
  }, [userData, fetchCommunity]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <Title level={2}>{title}</Title>

      <Form
        name="event-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={handleSubmit(async (data) => {
          try {
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "ml_default");

              const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dc0jqirfl/image/upload",
                {
                  method: "POST",
                  body: formData,
                }
              );

              const uploadData = await uploadResponse.json();
              data.image = uploadData.secure_url;
            }

            data.uid = userData?.user?.uid;
            data.community_id = communityId || undefined;

            const response = await mutateAsync(data); // Pass all data including image

            console.log("Event created:", response);
          } catch (error) {
            console.error("Event creation error:", error);
          }
        })}
        autoComplete="off"
      >
        {/* Title Field */}
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Title" />}
          />
        </Form.Item>

        {/* Description Field */}
        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} placeholder="Description" />}
          />
        </Form.Item>

        {/* Date Field */}
        <Form.Item
          label="Date"
          validateStatus={errors.date ? "error" : ""}
          help={errors.date?.message}
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                showTime
                onChange={(date) => {
                  if (date) {
                    field.onChange(dayjs(date).toISOString());
                  } else {
                    field.onChange(null);
                  }
                }}
                value={field.value ? dayjs(field.value) : null}
              />
            )}
          />
        </Form.Item>

        {/* Location Field */}
        <Form.Item
  label="Location"
  validateStatus={errors.city_id ? "error" : ""}
  help={errors.city_id?.message}
>
  <Controller
    name="city_id"
    control={control}
    render={({ field }) => (
      <Select
        {...field}
        options={cities.map((city) => ({
          value: city.id,
          label: city.name,
        }))}
      />
    )}
  />
</Form.Item>

        {/* File Upload Field */}
        <Form.Item valuePropName="fileList">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            listType="picture-card"
            showUploadList={false}
            onPreview={handlePreview}
          >
            <Button style={{ border: 0, background: "none" }} icon={<PlusOutlined />}>
              Upload Image
            </Button>
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <CustomButton style={{ marginRight: 7 }} label="Cancel" onClick={() => {}} />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;