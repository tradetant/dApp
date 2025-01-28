#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod tradetant {
    use super::*;

  pub fn close(_ctx: Context<CloseTradetant>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tradetant.count = ctx.accounts.tradetant.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tradetant.count = ctx.accounts.tradetant.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeTradetant>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.tradetant.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeTradetant<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Tradetant::INIT_SPACE,
  payer = payer
  )]
  pub tradetant: Account<'info, Tradetant>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseTradetant<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub tradetant: Account<'info, Tradetant>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub tradetant: Account<'info, Tradetant>,
}

#[account]
#[derive(InitSpace)]
pub struct Tradetant {
  count: u8,
}
