export const changeInput = (
    { key, value }: Record<string, any>,
    setProfileValues: (value: any) => void,
) => {
    setProfileValues((prevState: any) => ({
        ...prevState,
        [key]: value,
    }));
};
