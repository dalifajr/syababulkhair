import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/achievement-posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::index
 * @see app/Http/Controllers/Admin/AchievementPostController.php:15
 * @route '/admin/achievement-posts'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/achievement-posts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::create
 * @see app/Http/Controllers/Admin/AchievementPostController.php:35
 * @route '/admin/achievement-posts/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::store
 * @see app/Http/Controllers/Admin/AchievementPostController.php:40
 * @route '/admin/achievement-posts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/achievement-posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::store
 * @see app/Http/Controllers/Admin/AchievementPostController.php:40
 * @route '/admin/achievement-posts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::store
 * @see app/Http/Controllers/Admin/AchievementPostController.php:40
 * @route '/admin/achievement-posts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::store
 * @see app/Http/Controllers/Admin/AchievementPostController.php:40
 * @route '/admin/achievement-posts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::store
 * @see app/Http/Controllers/Admin/AchievementPostController.php:40
 * @route '/admin/achievement-posts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
export const edit = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/achievement-posts/{achievementPost}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
edit.url = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievementPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { achievementPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    achievementPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievementPost: typeof args.achievementPost === 'object'
                ? args.achievementPost.id
                : args.achievementPost,
                }

    return edit.definition.url
            .replace('{achievementPost}', parsedArgs.achievementPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
edit.get = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
edit.head = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
    const editForm = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
        editForm.get = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::edit
 * @see app/Http/Controllers/Admin/AchievementPostController.php:65
 * @route '/admin/achievement-posts/{achievementPost}/edit'
 */
        editForm.head = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::update
 * @see app/Http/Controllers/Admin/AchievementPostController.php:72
 * @route '/admin/achievement-posts/{achievementPost}'
 */
export const update = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/achievement-posts/{achievementPost}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::update
 * @see app/Http/Controllers/Admin/AchievementPostController.php:72
 * @route '/admin/achievement-posts/{achievementPost}'
 */
update.url = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievementPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { achievementPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    achievementPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievementPost: typeof args.achievementPost === 'object'
                ? args.achievementPost.id
                : args.achievementPost,
                }

    return update.definition.url
            .replace('{achievementPost}', parsedArgs.achievementPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::update
 * @see app/Http/Controllers/Admin/AchievementPostController.php:72
 * @route '/admin/achievement-posts/{achievementPost}'
 */
update.put = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::update
 * @see app/Http/Controllers/Admin/AchievementPostController.php:72
 * @route '/admin/achievement-posts/{achievementPost}'
 */
    const updateForm = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::update
 * @see app/Http/Controllers/Admin/AchievementPostController.php:72
 * @route '/admin/achievement-posts/{achievementPost}'
 */
        updateForm.put = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\AchievementPostController::destroy
 * @see app/Http/Controllers/Admin/AchievementPostController.php:102
 * @route '/admin/achievement-posts/{achievementPost}'
 */
export const destroy = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/achievement-posts/{achievementPost}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::destroy
 * @see app/Http/Controllers/Admin/AchievementPostController.php:102
 * @route '/admin/achievement-posts/{achievementPost}'
 */
destroy.url = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { achievementPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { achievementPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    achievementPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        achievementPost: typeof args.achievementPost === 'object'
                ? args.achievementPost.id
                : args.achievementPost,
                }

    return destroy.definition.url
            .replace('{achievementPost}', parsedArgs.achievementPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AchievementPostController::destroy
 * @see app/Http/Controllers/Admin/AchievementPostController.php:102
 * @route '/admin/achievement-posts/{achievementPost}'
 */
destroy.delete = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AchievementPostController::destroy
 * @see app/Http/Controllers/Admin/AchievementPostController.php:102
 * @route '/admin/achievement-posts/{achievementPost}'
 */
    const destroyForm = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AchievementPostController::destroy
 * @see app/Http/Controllers/Admin/AchievementPostController.php:102
 * @route '/admin/achievement-posts/{achievementPost}'
 */
        destroyForm.delete = (args: { achievementPost: number | { id: number } } | [achievementPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AchievementPostController = { index, create, store, edit, update, destroy }

export default AchievementPostController