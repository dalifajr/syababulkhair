import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/gallery-posts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::index
 * @see app/Http/Controllers/Admin/GalleryPostController.php:15
 * @route '/admin/gallery-posts'
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
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/gallery-posts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::create
 * @see app/Http/Controllers/Admin/GalleryPostController.php:35
 * @route '/admin/gallery-posts/create'
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
* @see \App\Http\Controllers\Admin\GalleryPostController::store
 * @see app/Http/Controllers/Admin/GalleryPostController.php:40
 * @route '/admin/gallery-posts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/gallery-posts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::store
 * @see app/Http/Controllers/Admin/GalleryPostController.php:40
 * @route '/admin/gallery-posts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::store
 * @see app/Http/Controllers/Admin/GalleryPostController.php:40
 * @route '/admin/gallery-posts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::store
 * @see app/Http/Controllers/Admin/GalleryPostController.php:40
 * @route '/admin/gallery-posts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::store
 * @see app/Http/Controllers/Admin/GalleryPostController.php:40
 * @route '/admin/gallery-posts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
export const edit = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/gallery-posts/{galleryPost}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
edit.url = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { galleryPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    galleryPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        galleryPost: typeof args.galleryPost === 'object'
                ? args.galleryPost.id
                : args.galleryPost,
                }

    return edit.definition.url
            .replace('{galleryPost}', parsedArgs.galleryPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
edit.get = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
edit.head = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
    const editForm = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
        editForm.get = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::edit
 * @see app/Http/Controllers/Admin/GalleryPostController.php:65
 * @route '/admin/gallery-posts/{galleryPost}/edit'
 */
        editForm.head = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GalleryPostController::update
 * @see app/Http/Controllers/Admin/GalleryPostController.php:72
 * @route '/admin/gallery-posts/{galleryPost}'
 */
export const update = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/gallery-posts/{galleryPost}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::update
 * @see app/Http/Controllers/Admin/GalleryPostController.php:72
 * @route '/admin/gallery-posts/{galleryPost}'
 */
update.url = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { galleryPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    galleryPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        galleryPost: typeof args.galleryPost === 'object'
                ? args.galleryPost.id
                : args.galleryPost,
                }

    return update.definition.url
            .replace('{galleryPost}', parsedArgs.galleryPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::update
 * @see app/Http/Controllers/Admin/GalleryPostController.php:72
 * @route '/admin/gallery-posts/{galleryPost}'
 */
update.put = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::update
 * @see app/Http/Controllers/Admin/GalleryPostController.php:72
 * @route '/admin/gallery-posts/{galleryPost}'
 */
    const updateForm = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::update
 * @see app/Http/Controllers/Admin/GalleryPostController.php:72
 * @route '/admin/gallery-posts/{galleryPost}'
 */
        updateForm.put = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GalleryPostController::destroy
 * @see app/Http/Controllers/Admin/GalleryPostController.php:103
 * @route '/admin/gallery-posts/{galleryPost}'
 */
export const destroy = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/gallery-posts/{galleryPost}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::destroy
 * @see app/Http/Controllers/Admin/GalleryPostController.php:103
 * @route '/admin/gallery-posts/{galleryPost}'
 */
destroy.url = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galleryPost: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { galleryPost: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    galleryPost: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        galleryPost: typeof args.galleryPost === 'object'
                ? args.galleryPost.id
                : args.galleryPost,
                }

    return destroy.definition.url
            .replace('{galleryPost}', parsedArgs.galleryPost.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPostController::destroy
 * @see app/Http/Controllers/Admin/GalleryPostController.php:103
 * @route '/admin/gallery-posts/{galleryPost}'
 */
destroy.delete = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GalleryPostController::destroy
 * @see app/Http/Controllers/Admin/GalleryPostController.php:103
 * @route '/admin/gallery-posts/{galleryPost}'
 */
    const destroyForm = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GalleryPostController::destroy
 * @see app/Http/Controllers/Admin/GalleryPostController.php:103
 * @route '/admin/gallery-posts/{galleryPost}'
 */
        destroyForm.delete = (args: { galleryPost: number | { id: number } } | [galleryPost: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const GalleryPostController = { index, create, store, edit, update, destroy }

export default GalleryPostController