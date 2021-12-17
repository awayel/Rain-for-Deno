btn.onclick = () => {
    // const formData = new FormData();
    // formData.append("userName", "kingKKKKK");
    // formData.append("upwd", "123456798");
    // formData.append("age", "18");
    fetch("http://localhost:8005/api/post", {
        method: "POST",
        // body: formData,
        body: `{"ddd":123456,"ddd2":55555}`,
        headers: {
            "content-type": "application/json"
        }
    }).then(res => res.json()).then(
        res => {
            console.log(res);
        }
    );
}