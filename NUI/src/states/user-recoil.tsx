import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

const isUserAdmin = atom({
    key: 'userRole',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export default isUserAdmin;