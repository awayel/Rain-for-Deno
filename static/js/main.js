btn.onclick = () => {
    const formData = new FormData();
    formData.append("userName", "kingKKKKK");
    formData.append("upwd", "123456798");
    formData.append("age", "18");
    fetch("http://localhost:8015/api/post", {
        method: "POST",
        body: formData,
        // body: `{"rain":123456,"denoVersion":55555}`,
        headers: {
            // "content-type": "application/json"
            "content-type":"multipart/form-data"
        }
    }).then(res => res.json()).then(
        res => {
            console.log(res);
        }
    );
}