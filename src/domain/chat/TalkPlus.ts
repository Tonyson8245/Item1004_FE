export default class TalkPlusClass {
    
    private static instance: TalkPlusClass

    private constructor () {
    }
	
    // 메소드 이름은 달라도 상관없다.
    public static getInstance () {
        const public_key = import.meta.env.VITE_TALK_PLUS_PUBLIC_API_KEY;
        const test_key = import.meta.env.VITE_TALK_PLUS_TEST_API_KEY;
        //@ts-ignore
        //API 경로 설정
        //테스트 API 작동 오류로 일단 실 API 사용
        let api_key = public_key
        if (import.meta.env.MODE == "production")  api_key = public_key;
        else  api_key = test_key;        

        
        return this.instance || (this.instance = new TalkPlus.Client({
            appId: api_key,
          })
        )
    }
}