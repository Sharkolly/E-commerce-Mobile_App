import User from "../model/User";

export const create_user = async (
  username: string,
  email: string,
  password: string
) => {
  await User.create({
    username,
    email,
    password,
  });
};

export const check_email_and_username = async (
  username: string,
  email: string
) => {
  const user_email_exists = await User.findOne({ email });
  const user_username_exists = await User.findOne({ username });

  return { user_email_exists, user_username_exists };
};

export const check_email = async (email: string) => {
  const user = await User.findOne({ email }).select("+password");
  return { user };
};
