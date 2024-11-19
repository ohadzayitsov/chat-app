export const fetchJsonData = async (fileName:string) => {
    try {
        const response = await fetch(`/Data/${fileName}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        console.log(err.message);
    }
};