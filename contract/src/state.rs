use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use secret_toolkit_storage::Item;

pub static POSTS: Item<Vec<Post>> = Item::new(b"posts");
// pub static POST: AppendStore<Post> = AppendStore::new(b"post");

#[derive(Serialize, Deserialize, Clone, Debug, Default, Eq,PartialEq, JsonSchema)]
pub struct Post {
    pub title: String,
    pub description: String,
    pub date: String,
}

