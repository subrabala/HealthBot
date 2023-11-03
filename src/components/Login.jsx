import {
  Typography,
  Card,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleAdminButtonClick = () => {
    navigate("/chat");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/3">
        <div
          className="h-screen bg-cover bg-no-repeat flex items-center justify-start"
          style={{
            backgroundImage: 'url("/public/login.png")',
            borderRadius: "0 0 230px 0",
          }}
        >
          <div>
            <h1 className="text-5xl font-semibold p-5 text-white px-16">
              HealthBot: Your saviour
            </h1>
            <h4 className="text-lg text-white px-16">
              Empowering Health through AI Conversations
            </h4>
          </div>
        </div>
      </div>

      <div className="flex items-center  justify-center p-6 w-1/3">
        <div className="my-auto">
          <Card
            className="p-12"
            style={{ boxShadow: "rgba(17 17 26 0.1) 0px 0px 16px" }}
          >
            <Typography className="text-center font-bold text-black text-3xl py-6">
              SIGN UP / LOGIN
            </Typography>

            <div className="flex flex-col gap-4 pt-6">
              <Input
                label="E-mail"
                color="black"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                color="black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              color="teal"
              className={`bg-[#293a4d] hover hover:bg-black mt-8 `}
              onClick={handleAdminButtonClick}
            >
              <div>Login</div>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
