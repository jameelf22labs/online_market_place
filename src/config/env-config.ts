import dotenv from "dotenv";

dotenv.config();

type PostgressType = {
  Host: string;
  Port: number;
  Username: string;
  Password: string;
  Db : string;
};

type EnvConfiqType = {
  Port: Number;
  Postgress: PostgressType;
  JwtSectret: string;
};

const envConfig: EnvConfiqType = {
  Port: Number(process.env.PORT) || 8080,
  Postgress: {
    Host: process.env.POSTGRESS_HOST || "",
    Port: Number(process.env.POSTGRESS_PORT),
    Username: process.env.POSTGRESS_USERNAME || "",
    Password: (process.env.POSTGRESS_PASSWORD as string) || "",
    Db : process.env.POSTGRESS_DB || ""
  },
  JwtSectret: process.env.JWT_SECRETS || "",
};

export default envConfig;
