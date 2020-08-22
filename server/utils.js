const rt = (code = 200, msg = '', data = {}) => {
    return {
        code,
        msg,
        data
    }
}
export default rt;
