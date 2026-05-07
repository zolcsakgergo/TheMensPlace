import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutImage",
      title: "About / interior photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "locationImage",
      title: "Location / map photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Scroll video (background loop)",
      description:
        "Short, muted, looping clip for the scroll-triggered video section. MP4 or WebM, ideally 15–30s.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "team",
      title: "Echipa (Team)",
      type: "array",
      of: [
        {
          type: "object",
          name: "barber",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Portrait", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              initialValue: "normal",
              options: {
                list: [
                  { title: "Normal", value: "normal" },
                  { title: "Tall (spans two rows)", value: "tall" },
                  { title: "Wide (spans two columns)", value: "wide" },
                ],
                layout: "radio",
              },
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "size", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
