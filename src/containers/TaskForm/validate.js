const validate = values =>{
    const errors = {};
    const { title } = values;
    if(!title){
        errors.title = "Vui Lòng Nhập Tiêu Đề.";
    } else if(title.trim() && title.length < 5){
        errors.title = "Vui Lòng Nhập Lớn Hơn 5 Kí Tự.";
    }
    return errors;
};

export default validate;
