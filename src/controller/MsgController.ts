import { Controller, GetMapping, Param } from '../../rain/index.ts';

@Controller("/msg")
class MsgController {

    @GetMapping("/get")
    public getUserInfo(
        @Param("id","number") msgId: number,
    ) {
        return {
            code: 200,
            message: "获取消息ID成功",
            data: { msgId }
        }
    }

}

export default MsgController;