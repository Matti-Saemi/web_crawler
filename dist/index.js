"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event = {}) => {
    console.log('Hello World');
    const response = JSON.stringify(event, null, 2);
    return response;
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ08sTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLFFBQWEsRUFBRSxFQUFnQixFQUFFO0lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQTtBQU5ZLFFBQUEsT0FBTyxXQU1uQiJ9