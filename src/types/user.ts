export type User = {
	'name': string;
	'avatarUrl': string;
	'isPro': boolean;
	'email': string;
	'token': string;
} | null

export type LoginData = {
	email: string;
	password: string;
}
