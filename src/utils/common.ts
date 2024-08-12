// 定义一个MessageType类型，可以根据实际情况进行修改
type MessageType = 'info' | 'success' | 'warning' | 'error';
type Message = 'delete' | 'save' | 'edit' | 'add';
export default {
    // massageBox封装
    message_box: (msg: string, type: MessageType = 'warning') => {
        return new Promise((resolve, reject) => {
            ElMessageBox.confirm(msg, '温馨提示', {
                type: type,
                autofocus: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                });
        });
    },
    // alert封装
    alert: (msg: string, type: MessageType = 'warning') => {
        return new Promise((resolve, reject) => {
            ElMessageBox.alert(msg, '温馨提示', {
                type: type,
                autofocus: false,
                confirmButtonText: '确定',
            }).then(() => {
                resolve(true);
            });
        });
    },
};
