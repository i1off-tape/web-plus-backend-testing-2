import { PostsService } from './posts.service'

describe('PostsService', () => {
	let postsService: PostsService

	beforeEach(() => {
		postsService = new PostsService()
	})

	describe('.findMany', () => {
		const posts = [
			{ text: 'Post 1' },
			{ text: 'Post 2' },
			{ text: 'Post 3' },
			{ text: 'Post 4' },
			{ text: 'Post 5' },
			{ text: 'Post 6' },
		]

		beforeEach(() => {
			posts.forEach(post => postsService.create(post))
		})

		it('should return all posts if called without options', () => {
			const result = postsService.findMany()
			expect(result).toHaveLength(6)
			expect(result.map(p => p.text)).toEqual(posts.map(p => p.text))
		})

		it('should return correct posts for skip and limit options', () => {
			const result = postsService.findMany({ skip: 2, limit: 3 })
			expect(result).toHaveLength(3)
			expect(result.map(p => p.text)).toEqual(['Post 3', 'Post 4', 'Post 5'])
		})

		// Недостающие тесты
		it('should handle skip without limit', () => {
			const result = postsService.findMany({ skip: 4 })
			expect(result).toHaveLength(2)
			expect(result.map(p => p.text)).toEqual(['Post 5', 'Post 6'])
		})

		it('should handle limit without skip', () => {
			const result = postsService.findMany({ limit: 2 })
			expect(result).toHaveLength(2)
			expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2'])
		})

		it('should return empty array when skip is too large', () => {
			const result = postsService.findMany({ skip: 100 })
			expect(result).toEqual([])
		})

		it('should return all posts when limit is larger than array length', () => {
			const result = postsService.findMany({ limit: 100 })
			expect(result).toHaveLength(6)
		})
	})
})
