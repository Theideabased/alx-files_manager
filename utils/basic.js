import { ObjectId } from 'mongodb';

const basicUtils = {
    isValid(id) {
        try{
            ObjectId(id);
        } catch (err) {
            return false
        }
        return true;
    },
};

export default basicUtils;