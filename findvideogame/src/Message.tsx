import { LoginDetails } from "./constants/config";

export default function Message(): JSX.Element {
    const loggedInName = LoginDetails.name;
    // JSX
    if (loggedInName) {
        return <><h2>Hello {loggedInName}!</h2></> ;
    } 
    return <><h2>Hello User!</h2></>;
}