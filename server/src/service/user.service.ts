import User from "../model/User";

export const get_user_from_db = async (user_id: string) => {
    const user = await User.findById(user_id).select("-password");
    return user;
};
