/**
 * reducerは、actionを受けてstateを変更するの為のメソッド
 * 大元のrootReducerを作って、他のreducerを結合することが一般的
 * （１ファイルに全部書くと肥大化していくため、importで読み込むようにしているってこと）
 */
import {combineReducers} from "redux"
import task from "./task"

const reducer = combineReducers({
  task
});

export default reducer;