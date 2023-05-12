interface Friend {
	_id: string
	fullName: string
	avatarUrl: string
	city: string
}

export interface User {
	_id: string
	fullName: string
	age: string
	avatarUrl: string
	city: string
	university: string
	email: string
	friends: Friend[]
}

export interface Post {
	_id: string
	description: string
	imageUrl: string
	user: User
	likes: number[]
}

export interface InitialState {
	mode: string
	user: User | null
	token: string | null
	posts: Post[]
	users: User[]
	search: string
	notice: boolean
}

export interface RootState {
	mode: string
	token: string
	user: User
	users: User[]
	posts: Post[]
	search: string
	notice: boolean
}
