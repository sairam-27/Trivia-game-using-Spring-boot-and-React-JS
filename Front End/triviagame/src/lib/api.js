const proxy = "http://localhost:8080";

export const getAllUsers = async (reqData) => {
  const response = await fetch(`${proxy}/api/test/users`, {
    headers: {
      cookies: localStorage.getItem("cookie"),
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }

  return data;
};

export const signup = async (reqData) => {
  const response = await fetch(`${proxy}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(reqData.body),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return {
    data,
  };
};

export const signIn = async (reqData) => {
  const response = await fetch(`${proxy}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify(reqData.body),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  let cookie = "";
  for (const header of response.headers) {
    for (const data of header) {
      if (data.includes("cookie")) {
        cookie = data.split(";").at(0).split("=").at(1);
        // localStorage.setItem("cookie", cookie);
        // data["cookie"] = cookie
      }
    }
  }
  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return {
    ...data,cookie
  };
};

export const getQuestions = async (reqData) => {
  const response = await fetch(`${proxy}/api/test/questions`, {
    method: "POST",
    headers: {
      cookies: localStorage.getItem("cookie"),
    },
    body: JSON.stringify(reqData.body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return data;
};

export const sendSelectedOptions = async (reqData) => {
  const response = await fetch(`${proxy}/api/test/getSelectedOptions`, {
    method: "POST",
    headers: {
      cookies: localStorage.getItem("cookie"),
    },
    body: JSON.stringify(reqData.body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return data;
};

export const getUserHistory = async (reqdata) => {
  const user = reqdata.user;
  const response = await fetch(
    `${proxy}/api/test/gethistory?username=${user}`,
    {
      method: "POST",
      headers: {
        cookies: localStorage.getItem("cookie"),
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return data;
};

export const getGlobalHistory = async (reqdata) => {

  const response = await fetch(
    `${proxy}/api/test/global/history`,
    {
      method: "POST",
      headers: {
        cookies: localStorage.getItem("cookie"),
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error in sending request!");
  }
  return data;
};
