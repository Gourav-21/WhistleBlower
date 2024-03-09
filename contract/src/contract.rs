use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdError, StdResult, Storage
};
use crate::state::{Post,POSTS};
use crate::msg::{ExecuteMsg, InstantiateMsg, PostResponse, QueryMsg};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    POSTS.save(deps.storage, &msg.post)?;
    deps.api
        .debug(format!("Contract was initialized by {}", info.sender).as_str());
    
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::CreatePost { title, description, date } => create_post(deps,title,description,date),
    }
}

pub fn create_post(
    deps: DepsMut,
    title: String,
    description: String,
    date: String,
) -> StdResult<Response> {
    let newpost=Post{title,description,date};
    // POST.push(&mut deps.storage, &newpost);
    let p=POSTS.update(deps.storage, |mut v|{
        v.push(newpost);
        deps.api.debug(format!("Contract was initialized by {:?}", v).as_str());
        Ok(v)
    }).unwrap();
    POSTS.save(deps.storage, &p)?;
    deps.api.debug("count reset successfully");
    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetPost {} => to_binary(&get_post(deps)?),
    }
}

fn get_post(deps: Deps) -> StdResult<PostResponse> {
    let post = POSTS.load(deps.storage);
    // let x = POST.iter(&deps.storage)?;
    // let (len, _) = x.size_hint();
    let p=post.unwrap();

    Ok( PostResponse {posts:p} )
}

