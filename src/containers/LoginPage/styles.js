const styles = theme => ({
    //Viết cho class có tên là background
    background : {
        backgroundColor : theme.palette.primary.main, //để màu nền là xanh
        padding : 40, //cho form ra giữa màn hình
        display : 'flex',//co lại về bên trái
        flexDirection : 'column', //chia thành cột
        alignItems : 'center',//để khung nhập giữa form
        justifyContent : "center",
        minHeight : '100vh',//chiều cao thấp nhất
        textAlign : 'center',//căn chữ ở giữa
        flex : '1 0 auto'
    }
});

export default styles;
