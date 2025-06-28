"use client";

const CheckLimit = () => {
  const check = async () => {
    const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
      },
    });

    console.log("Limit: ", response);
  };

  return (
    <button onClick={check} className="cursor-pointer">
      Check Limit
    </button>
  );
};

export default CheckLimit;
