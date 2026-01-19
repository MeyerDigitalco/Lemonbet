import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../localisation/useLanguage";
import { useUser } from "./useUser";
import { validateEmail } from "../common_funcs";

export const useUpdateUserInfo = () => {
    const {
        languagePack: {
            pack: { userInfoForm },
        },
    } = useLanguage();

    const {
        user,
        updateUserInfo,
        changePassword,
        isUserInfoUpdateLoading,
        isChangePasswordLoading,
    } = useUser();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [retypeNewPasswordError, setRetypeNewPasswordError] = useState("");

    const [email, setEmail] = useState(user?.user_email || "");
    const [phone, setPhone] = useState(user?.user_phone || "");
    const [firstname, setFirstname] = useState(user?.user_firstname || "");
    const [lastname, setLastname] = useState(user?.user_lastname || "");

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [retypeNewPassword, setRetypeNewPassword] = useState();

    const prevUser = useRef(null);

    useEffect(() => {
        if (user && user !== prevUser.current) {
            setEmail(user.user_email || "");
            setPhone(user.user_phone || "");
            setFirstname(user.user_firstname || "");
            setLastname(user.user_lastname || "");

            prevUser.current = user;
        }
    }, [user]);

    useEffect(() => {
        // Password validations
        if (
            (currentPassword !== undefined && currentPassword.trim() === "") ||
            (currentPassword === undefined && (retypeNewPassword || newPassword))
        ) setPasswordError(userInfoForm.emptyFieldWarningMessage);
        else setPasswordError("");

        if (
            (newPassword !== undefined && newPassword.trim() === "") ||
            (newPassword === undefined && (currentPassword || retypeNewPassword))
        ) setNewPasswordError(userInfoForm.emptyFieldWarningMessage);
        else setNewPasswordError("");

        if (
            ((newPassword || currentPassword) && retypeNewPassword === undefined) ||
            (retypeNewPassword !== undefined && retypeNewPassword.trim() === "")
        ) setRetypeNewPasswordError(userInfoForm.emptyFieldWarningMessage);
        else if (newPassword && retypeNewPassword && newPassword !== retypeNewPassword)
            setRetypeNewPasswordError(userInfoForm.passNotMatchWarningMessage);
        else setRetypeNewPasswordError("");

        // Email validation
        const emailValidationResult = validateEmail(
            email,
            userInfoForm.emailIsRequiredMess,
            userInfoForm.notValidEmail
        );
        setEmailError(emailValidationResult);
    }, [
        currentPassword,
        newPassword,
        retypeNewPassword,
        email,
        userInfoForm.emptyFieldWarningMessage,
        userInfoForm.passNotMatchWarningMessage,
        userInfoForm.emailIsRequiredMess,
        userInfoForm.notValidEmail,
    ]);

    const handleSaveInfo = () => {
        if (user) {
            const updatedUser = {
                ...user,
                user_email: email,
                user_phone: phone,
                user_firstname: firstname,
                user_lastname: lastname,
            };
            updateUserInfo(updatedUser);
        }
    };

    const handleUpdatePassword = () => {
        if (currentPassword && newPassword && retypeNewPassword) {
            changePassword(currentPassword, newPassword, () => {
                setCurrentPassword(undefined);
                setNewPassword(undefined);
                setRetypeNewPassword(undefined);
            });
        }
    };

    return {
        userInfoForm,
        emailError,
        passwordError,
        newPasswordError,
        retypeNewPasswordError,
        email,
        phone,
        firstname,
        lastname,
        currentPassword,
        newPassword,
        retypeNewPassword,
        handleSaveInfo,
        handleUpdatePassword,
        isUserInfoUpdateLoading,
        isChangePasswordLoading,
        setEmail,
        setEmailError,
        setPhone,
        setLastname,
        setFirstname,
        setCurrentPassword,
        setNewPassword,
        setRetypeNewPassword,
    };
};
