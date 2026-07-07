export const config = {
  components: {
    Heading: {
      fields: {
        title: {
          type: "text",
        },
      },

      render: ({ title }) => (
        <h1 className="text-4xl font-bold py-8">{title}</h1>
      ),
    },

    Text: {
      fields: {
        text: {
          type: "textarea",
        },
      },

      render: ({ text }) => <p className="py-2">{text}</p>,
    },

    Button: {
      fields: {
        text: {
          type: "text",
        },
      },

      render: ({ text }) => (
        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          {text}
        </button>
      ),
    },
  },
};
