const input = document.createElement('input');
input.type="file";
document.body.appendChild(input);

btn.onclick = () => {
    const formData = new FormData();
    formData.append("userName", "kingKKKKK");
    formData.append("upwd", "123456798");
    formData.append("age", "18");
    formData.append("file", input.files[0])
    fetch("http://localhost:8000/api/post", {
        method: "POST",
        body: formData,
        // body: JSON.stringify({
        //     userName: "123456",
        //     name: "张三"
        // }),
        // headers: {
        //     "content-type": "application/json"
        // }
    }).then(res => res.json()).then(
        res => {
            console.log(res);
        }
    );
}