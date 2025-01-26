import { query } from "../config/db";

export const getAllRooms = async () => {
  const sql = `
    SELECT DISTINCT room_number, name
    FROM account_chat
    ORDER BY room_number ASC;
  `;
  const result = await query(sql);
  return result.rows;
};
