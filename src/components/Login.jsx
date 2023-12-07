import { Typography, Card, Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });
  const [signupFields, setSignupFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("username", loginFields.username);
    formData.append("password", loginFields.password);
    try {
      const response = await axios.put(
        `https://shivanshgoel.xyz/api/auth/login`,
        formData
      );
      const token = response.data.access_token;
      localStorage.setItem("chat", token);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      alert(error.response.data.detail.message);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://shivanshgoel.xyz/api/auth/createaccount",
        {
          first_name: signupFields.firstName,
          last_name: signupFields.lastName,
          email: signupFields.email,
          phone: signupFields.phone,
          password: signupFields.password,
        }
      );
      const token = response.data.access_token;
      localStorage.setItem("chat", token);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      alert(error.response.data.detail.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/5">
        <div
          className="h-screen bg-cover bg-no-repeat flex items-center justify-start"
          style={{
            backgroundImage: 'url("/login.png")',
            borderRadius: "0 0 230px 0",
          }}
        >
          <div>
            <h1 className="text-5xl font-semibold p-5 text-white px-16">
              SRM Health Bot
            </h1>
            <h4 className="text-lg text-white px-16">
              Empowering Health through AI Conversations
            </h4>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 w-2/5 ">
        <div className="my-auto">
          {isSignup ? (
            <Card
              className="p-12"
              style={{ boxShadow: "rgba(17 17 26 0.1) 0px 0px 16px" }}
            >
              <Typography className="text-center font-bold text-black text-3xl py-6">
                SIGN UP
              </Typography>

              <div className="flex flex-col gap-4 pt-6">
                <div className="flex gap-2">
                  <Input
                    label="First Name"
                    color="black"
                    type="text"
                    value={signupFields.firstName}
                    onChange={(e) =>
                      setSignupFields({
                        ...signupFields,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Last Name"
                    color="black"
                    type="text"
                    value={signupFields.lastName}
                    onChange={(e) =>
                      setSignupFields({
                        ...signupFields,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <Input
                  label="E-mail"
                  color="black"
                  type="email"
                  value={signupFields.email}
                  onChange={(e) =>
                    setSignupFields({ ...signupFields, email: e.target.value })
                  }
                />
                <Input
                  label="Phone"
                  color="black"
                  type="tel"
                  value={signupFields.phone}
                  onChange={(e) =>
                    setSignupFields({ ...signupFields, phone: e.target.value })
                  }
                />
                <Input
                  label="Password"
                  color="black"
                  type="password"
                  value={signupFields.password}
                  onChange={(e) =>
                    setSignupFields({
                      ...signupFields,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                color="teal"
                className={`bg-[#293a4d] hover hover-bg-black mt-8 `}
                onClick={handleSignup}
              >
                <div>Sign Up</div>
              </Button>
              <p className="text-xs pt-2">
                Already have an account?
                <span
                  className="cursor-pointer text-blue-800"
                  onClick={() => setIsSignup(false)}
                >
                  LOG IN
                </span>
              </p>
            </Card>
          ) : (
            <Card
              className="p-12"
              style={{ boxShadow: "rgba(17 17 26 0.1) 0px 0px 16px" }}
            >
              <Typography className="text-center font-bold text-black text-3xl py-6">
                LOGIN
              </Typography>

              <div className="flex flex-col gap-4 pt-6">
                <Input
                  label="Username"
                  color="black"
                  type="name"
                  value={loginFields.username}
                  onChange={(e) =>
                    setLoginFields({ ...loginFields, username: e.target.value })
                  }
                />
                <Input
                  label="Password"
                  color="black"
                  type="password"
                  value={loginFields.password}
                  onChange={(e) =>
                    setLoginFields({
                      ...loginFields,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                color="teal"
                className={`bg-[#293a4d] hover hover-bg-black mt-8 `}
                onClick={handleLogin}
              >
                <div>Login</div>
              </Button>
              <p className="pt-2 text-xs">
                Don't have an account?
                <span
                  className="true cursor-pointer text-blue-800"
                  onClick={() => setIsSignup(true)}
                >
                  SIGN UP
                </span>
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
