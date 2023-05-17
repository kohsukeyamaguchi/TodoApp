// TaskのAction
// storeの値を更新する際にこのアクションをdispatch()を使って呼び出すためのもの
// actionはアプリケーションからの情報をstoreへ送る為のオブジェクト
// actionは、何を行なうものかを識別するために"type"プロパティを必ず持つ。他のプロパティについては自由。

// Action Creatorと呼ぶが実際はただの関数function
// 色々なアクションごとに更新するstateと値を定義する

export function addTask(id, title, details, date) {
  // 変更する値のみを定義する
  // typeでAction名を定義する。何のアクションなのかがパッとわかるものにする（大文字にするのが一般的）
  // ここで定義したプロパティがreducerへ渡される（idだけならidだけしかreducerには渡らない）
  return {
    type: "ADD",
    id: id,
    title: title,
    details: details,
    date: date
  };
}

export function deleteTask(id) {
  return {
    type: "DELETE",
    id: id
  };
}

export function updateTask(id, title, details, date) {
  return {
    type: "UPDATE",
    id: id,
    title: title,
    details: details,
    date: date
  };
}

export function changeUpdateTask(id, title, details, date) {
  return {
    type: "CHANGE_UPDATE",
    id: id,
    title: title,
    details: details,
    date: date
  };
}

export function toggleDone(id) {
  return {
    type: "TOGGLE_DONE",
    id: id
  };
}

export function showEdit(id){
  return {
    type: "SHOW_EDIT",
    id: id
  };
}

export function sortTask(sortMode){
  return {
    type: "SORT",
    sortMode: sortMode
  };
}

export function allCloseEdit(){
  return {
    type:"ALL_CLOSE"
  };
}

export function createList(listName){
  return{
    type:"CREATE_LIST",
    listName: listName
  }
}

export function changeCurrentList(currentList){
  return{
    type:"CHANGE_CURRENT_LIST",
    currentList: currentList
  }
}


