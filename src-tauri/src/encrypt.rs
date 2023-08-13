use rand::Rng;
use aes::Aes256;
use block_modes::{BlockMode, Cbc};
use block_modes::block_padding::Pkcs7;
use std::fs::File;
use std::io::prelude::*;

fn generate_key() -> [u8; 32] {
  let mut key = [0u8; 32];
  let mut rng = rand::thread_rng();
  rng.fill(&mut key);
  key
}

fn encrypt(data: &[u8], key: &[u8]) -> Vec<u8> {
  let iv = [0u8; 16]; // 初始化向量
  let cipher = Cbc::<Aes256, Pkcs7>::new_var(key, &iv).unwrap();
  let ciphertext = cipher.encrypt_vec(data);
  ciphertext
}

fn decrypt(data: &[u8], key: &[u8]) -> Vec<u8> {
  let iv = [0u8; 16]; // 初始化向量
  let cipher = Cbc::<Aes256, Pkcs7>::new_var(key, &iv).unwrap();
  let plaintext = cipher.decrypt_vec(data).unwrap();
  plaintext
}

fn save_key_to_file(key: &[u8]) -> std::io::Result<()> {
  let mut file = File::create("key.key")?;
  file.write_all(key)?;
  Ok(())
}

fn read_key_from_file() -> std::io::Result<[u8; 32]> {
  let mut file = File::open("key.key")?;
  let mut key = [0u8; 32];
  file.read_exact(&mut key)?;
  Ok(key)
}
