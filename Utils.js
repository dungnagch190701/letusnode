const getCurrentDate = ()=>{
    const option = { year : 'numeric' , month:'long',day:'numeric'};
    return new Date().toLocaleDateString("vi-VN",option);
}

exports.getCurrentDate =getCurrentDate