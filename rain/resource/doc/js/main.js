const jsonTemplate = `
<div>
    <div v-if="json===null">null</div>
    <div v-else-if="typeof json ==='string'">"{{json}}"</div>
    <div v-else-if="typeof json ==='number'">{{json}}</div>
    <div class="response" v-else-if="typeof json == 'object' && json.constructor == Array">
        <div>[</div>
        <div class="response-key-value" v-for="(el,idx) in json" :key="idx">
            <json-show :json="el"></json-show>
            <template v-if="idx!==json.length-1">,</template>
        </div>
        <div>]</div>
    </div>
    <template v-else>
        <div class="response">
            <div>{</div>
            <div v-for="(value,key) in json" :key="key">
                <div class="response-key-value">
                    <div>"{{key}}"</div>
                    <div> : </div>
                    <json-show :json="value"></json-show>,
                </div>
            </div>
            <div>}</div>
        </div>
    </template>
</div>
`;


const app = Vue.createApp({
    data() {
        return {
            controllers: []
        }
    },
    mounted() {
        fetch("/rain-doc/getInfo")
            .then(res => res.json())
            .then(res => {
                const data = res;
                for (const key in data) {
                    const controller = data[key];
                    controller.children.forEach(api => {
                        if (api.contentType === "application/json") {
                            api.requestParam = "";
                            return;
                        }
                        const params = controller.paramsMap[api.name]
                        if (params) {
                            api.params = [];
                            for (const key in params) {
                                const param = params[key];
                                if (param.paramsType === 'number') {
                                    param.value = 0;
                                } else {
                                    param.value = "";
                                }
                                api.params.push(param);
                            }
                        }
                    });
                }
                this.controllers = data;
            })
    },
    methods: {
        send(api, controller) {
            api.loading = 'loading';
            const url = controller.path + api.path;
            if (api.method === "POST") {
                if (api.contentType === "multipart/form-data") {
                    const formData = new FormData();
                    if (api.params instanceof Array)
                        api.params.forEach(param => {
                            if (param.paramsType === "number") {
                                formData.append(param.paramName, Number(param.value));
                            } else {
                                formData.append(param.paramName, param.value);
                            }
                        })
                    fetch(url, {
                        body: formData,
                        method: "POST"
                    }).then(res => res.json()).then(res => {
                        api.response = res;
                        setTimeout(() => { api.loading = 'finish' }, 600)
                    }).catch(() => {
                        setTimeout(() => { api.loading = 'error' }, 600)
                    })
                } else {
                    const requestBody = api.requestParam;
                    fetch(url, {
                        body: JSON.stringify(requestBody),
                        method: "POST",
                        headers: {
                            "Content-Type": api.contentType
                        }
                    }).then(res => res.json()).then(res => {
                        api.response = res;
                        setTimeout(() => { api.loading = 'finish' }, 600)
                    }).catch(() => {
                        setTimeout(() => { api.loading = 'error' }, 600)
                    })
                };
            } else if (api.method === "GET") {
                let queryString = "?";
                if (api.params instanceof Array)
                    api.params.forEach(param => {
                        queryString += `${param.paramName}=${param.value}&`;
                    })
                queryString = queryString.replace(/&$/, '');
                if (queryString === '?') {
                    queryString = "";
                }
                fetch(url + queryString, {
                    method: "GET",
                }).then(res => res.json()).then(res => {
                    api.response = res;
                    setTimeout(() => { api.loading = 'finish' }, 600)
                }).catch(() => {
                    setTimeout(() => { api.loading = 'error' }, 600)
                })
            }
        },
        handlePick(domId, api) {
            api.show = !api.show;
        }
    }
})
    .component('json-show', {
        name: 'json-show',
        template: jsonTemplate,
        props: ['json'],
        isCustomElement: false
    })
    .mount("#app");