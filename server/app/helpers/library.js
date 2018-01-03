module.exports.population = function(path){
	switch(path){
		case 'user':
		return {
			path:'user',
			model:'User',
			select:'firstName lastName _id profile'
		};
		case 'to':
		return {
			path:'to',
			model:'User',
			select:'firstName lastName _id'
		};
		case 'comments':
		return {
		path:'comments',
		model:'Comment',
		populate:
			[
			{path:'user',
			model:'User',
			select:'firstName lastName _id profile'},{
				path:'replies',
				model:'Reply',
				populate:[{
					path:'user'
				},{path:'to'}]
			}
			]
			
		
		}
		case 'replies':
		return {
		path:'replies',
		model:'Reply',
		populate:[{
					path:'user'
				},{path:'to'}]
			
		
		}}
		
	}
