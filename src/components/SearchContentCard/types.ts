export interface IBoards {
  data: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: uuid */
    user_id: string;
    /** Format: text */
    title?: string;
    /** Format: text */
    description?: string;
    /** Format: boolean */
    isComplete?: boolean;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    insertedat: string;
    /** Format: json */
    brd_labels?: string;
    /** Format: text */
    background?: string;
  };
}
