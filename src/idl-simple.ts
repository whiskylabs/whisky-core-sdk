import idlJson from "./idl.json"

// Transform account from new format to old Anchor format
function transformAccount(account: any): any {
  return {
    name: account.name,
    isMut: account.writable || false,
    isSigner: account.signer || false,
    ...(account.pda && { pda: account.pda }),
    ...(account.relations && { relations: account.relations }),
    ...(account.address && { address: account.address })
  }
}

// Transform instruction from new format to old Anchor format
function transformInstruction(instruction: any): any {
  return {
    name: instruction.name,
    ...(instruction.docs && { docs: instruction.docs }),
    accounts: instruction.accounts.map(transformAccount),
    args: instruction.args
  }
}

// Transform account definition from new format to old Anchor format  
function transformAccountDef(account: any): any {
  return {
    name: account.name,
    ...(account.docs && { docs: account.docs }),
    type: account.type || { kind: "struct", fields: [] }
  }
}

// Transform the JSON IDL to the format Anchor expects
const transformedIDL = {
  version: idlJson.metadata.version,
  name: idlJson.metadata.name,
  instructions: idlJson.instructions.map(transformInstruction),
  accounts: idlJson.accounts.map(transformAccountDef),
  types: idlJson.types,
  events: idlJson.events,
  errors: idlJson.errors,
  metadata: {
    address: idlJson.address
  }
}

export type WhiskyCore = typeof transformedIDL

export const IDL: WhiskyCore = transformedIDL

export default IDL
