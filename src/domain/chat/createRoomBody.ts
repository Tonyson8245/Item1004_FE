import {IsString} from "class-validator";
  
  export class createRoomBody {
    @IsString()  
    postIdx: string | string[];
  
    constructor(
        postIdx: string | string[],     
    ) {
      this.postIdx = postIdx;    
    }
  }
  