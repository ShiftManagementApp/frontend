import type { 
  Adapter, 
  AdapterUser, 
  AdapterAccount, 
  AdapterSession, 
  VerificationToken 
} from "next-auth/adapters";

/**
 * NextAuth公式ドキュメントのAdapterインターフェース (一例)
 * 
 * interface Adapter {
 *   createUser(user: Omit<AdapterUser, "id">): Awaitable<AdapterUser>;
 *   getUser(id: string): Awaitable<AdapterUser | null>;
 *   getUserByEmail(email: string): Awaitable<AdapterUser | null>;
 *   getUserByAccount({ provider, providerAccountId }: { provider: string, providerAccountId: string }): Awaitable<AdapterUser | null>;
 *   updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Awaitable<AdapterUser>;
 *   deleteUser(id: string): Awaitable<void | AdapterUser>;
 *   linkAccount(account: AdapterAccount): Awaitable<AdapterAccount | null | undefined>;
 *   unlinkAccount({ provider, providerAccountId }: { provider: string, providerAccountId: string }): Awaitable<void | AdapterAccount>;
 *   createSession(session: { sessionToken: string, userId: string, expires: Date }): Awaitable<AdapterSession>;
 *   getSessionAndUser(sessionToken: string): Awaitable<{ session: AdapterSession, user: AdapterUser } | null>;
 *   updateSession(session: { sessionToken: string }): Awaitable<AdapterSession | null | undefined>;
 *   deleteSession(sessionToken: string): Awaitable<void>;
 *   createVerificationToken(token: VerificationToken): Awaitable<VerificationToken | null | undefined>;
 *   useVerificationToken(token: { identifier: string, token: string }): Awaitable<VerificationToken | null>;
 * }
 */

// Flask の URL (例: http://localhost:5000)
const DEFAULT_FLASK_ENDPOINT = "http://localhost:5000";

/**
 * Flask の API をコールするカスタムアダプタ
 */
export function MyFlaskAdapter(flaskEndpoint: string = DEFAULT_FLASK_ENDPOINT): Adapter {
  return {
    // =========
    // 1) ユーザ関連
    // =========
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      // Flask POST /api/users
      const res = await fetch(`${flaskEndpoint}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      const createdUser = await res.json();

      // 必須フィールドが欠けている場合も一応チェック
      if (!createdUser.id || !createdUser.email) {
        throw new Error("Invalid user data returned from Flask");
      }

      return {
        ...createdUser,
        id: createdUser.id,
        email: createdUser.email,
      } as AdapterUser;
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      // Flask GET /api/users/<id>
      const res = await fetch(`${flaskEndpoint}/api/users/${id}`);
      if (!res.ok) {
        // 404等ならユーザが見つからないので null を返す
        return null;
      }
      const user = await res.json();

      // userのidやemailがない場合もありうるのでチェック
      if (!user || !user.id || !user.email) {
        return null;
      }
      return {
        ...user,
        id: user.id,
        email: user.email,
      } as AdapterUser;
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      // Flask GET /api/users/email/<email>
      const res = await fetch(`${flaskEndpoint}/api/users/email/${email}`);
      if (!res.ok) {
        return null;
      }
      const user = await res.json();
      if (!user || !user.id || !user.email) {
        return null;
      }
      return {
        ...user,
        id: user.id,
        email: user.email,
      } as AdapterUser;
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<AdapterUser | null> {
      // Flask GET /api/accounts/<provider>/<providerAccountId>
      const res = await fetch(`${flaskEndpoint}/api/accounts/${provider}/${providerAccountId}`, {
        method: "GET",
      });
      if (!res.ok) {
        return null;
      }
      const account = await res.json();
      if (!account || !account.userId) {
        return null;
      }

      // アカウントに紐づくユーザを取得
      const userRes = await fetch(`${flaskEndpoint}/api/users/${account.userId}`);
      if (!userRes.ok) {
        return null;
      }
      const user = await userRes.json();
      if (!user || !user.id || !user.email) {
        return null;
      }
      return {
        ...user,
        id: user.id,
        email: user.email,
      } as AdapterUser;
    },

    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> {
      if (!user.id) {
        throw new Error("User id is required to updateUser");
      }
      // Flask PUT /api/users/<id>
      const res = await fetch(`${flaskEndpoint}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      const updated = await res.json();
      if (!updated || !updated.id || !updated.email) {
        throw new Error("Invalid user data returned from Flask");
      }
      return {
        ...updated,
        id: updated.id,
        email: updated.email,
      } as AdapterUser;
    },

    async deleteUser(userId: string): Promise<void> {
      // Flask DELETE /api/users/<userId>
      const res = await fetch(`${flaskEndpoint}/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        // 404 や 400 などの場合、必要に応じてthrowするか、静かにreturnするかを決める
        throw new Error("Failed to delete user");
      }
      // 成功した場合はvoidを返すだけ
      return;
    },

    // =========
    // 2) OAuth アカウント関連
    // =========
    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      // Flask POST /api/accounts
      // body: { userId, provider, providerAccountId, ... }
      const res = await fetch(`${flaskEndpoint}/api/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: account.userId,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          // アクセストークンやリフレッシュトークンがあればここで送る
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to link account");
      }
      const created = await res.json();
      // 必須フィールドがある程度含まれているかチェック
      if (!created || !created.provider || !created.providerAccountId) {
        throw new Error("Invalid account data returned from Flask");
      }
      return {
        ...account,
        // Flask 側が何を返すか次第ですが、最低限これらは上書きまたは再マージ
        provider: created.provider,
        providerAccountId: created.providerAccountId,
      };
    },

    async unlinkAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }): Promise<void> {
      // Flask DELETE /api/accounts/<provider>/<providerAccountId>
      const res = await fetch(`${flaskEndpoint}/api/accounts/${provider}/${providerAccountId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to unlink account");
      }
      return;
    },

    // =========
    // 3) セッション関連
    // =========
    /**
     * DBにセッションを保存する場合の例
     * 今回は `session.strategy = "jwt"` 前提でほぼ空実装
     */
    async createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> {
      // FlaskにPOSTしてDB保存するならここで実装
      // 簡易化のため成功したものとして返す
      return {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires,
      };
    },

    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      // JWT 戦略の場合呼ばれないことも多いので空実装
      return null;
    },

    async updateSession(session: {
      sessionToken: string;
      expires?: Date | undefined;
      userId?: string | undefined;
    }): Promise<AdapterSession | null | undefined> {
      // 同上
      return null;
    },

    async deleteSession(sessionToken: string): Promise<void> {
      // 同上
      return;
    },

    // =========
    // 4) Verification Token (メール認証など)
    // =========
    async createVerificationToken(token: VerificationToken): Promise<VerificationToken> {
      // Passwordless認証等で必要ならFlaskへ保存
      return token;
    },

    async useVerificationToken(token: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      // ここで取り出して1回限りのトークンを無効化するなど
      return null;
    },
  };
}
