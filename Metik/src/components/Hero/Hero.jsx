export default function Hero({
  heading,
  subHeading,
}) {
  return (
    <section className="py-24 bg-gray-100 text-center">

      <h1 className="text-5xl font-bold">

        {heading}

      </h1>

      <p className="mt-5 text-xl">

        {subHeading}

      </p>

    </section>
  );
}