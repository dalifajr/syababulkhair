import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/profile-content',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::index
 * @see app/Http/Controllers/Admin/ProfileContentController.php:15
 * @route '/admin/profile-content'
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
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/profile-content/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::create
 * @see app/Http/Controllers/Admin/ProfileContentController.php:43
 * @route '/admin/profile-content/create'
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
* @see \App\Http\Controllers\Admin\ProfileContentController::store
 * @see app/Http/Controllers/Admin/ProfileContentController.php:51
 * @route '/admin/profile-content'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/profile-content',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::store
 * @see app/Http/Controllers/Admin/ProfileContentController.php:51
 * @route '/admin/profile-content'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::store
 * @see app/Http/Controllers/Admin/ProfileContentController.php:51
 * @route '/admin/profile-content'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::store
 * @see app/Http/Controllers/Admin/ProfileContentController.php:51
 * @route '/admin/profile-content'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::store
 * @see app/Http/Controllers/Admin/ProfileContentController.php:51
 * @route '/admin/profile-content'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
export const edit = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/profile-content/{profileContent}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
edit.url = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profileContent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { profileContent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profileContent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profileContent: typeof args.profileContent === 'object'
                ? args.profileContent.id
                : args.profileContent,
                }

    return edit.definition.url
            .replace('{profileContent}', parsedArgs.profileContent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
edit.get = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
edit.head = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
    const editForm = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
        editForm.get = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::edit
 * @see app/Http/Controllers/Admin/ProfileContentController.php:79
 * @route '/admin/profile-content/{profileContent}/edit'
 */
        editForm.head = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ProfileContentController::update
 * @see app/Http/Controllers/Admin/ProfileContentController.php:88
 * @route '/admin/profile-content/{profileContent}'
 */
export const update = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/profile-content/{profileContent}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::update
 * @see app/Http/Controllers/Admin/ProfileContentController.php:88
 * @route '/admin/profile-content/{profileContent}'
 */
update.url = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profileContent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { profileContent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profileContent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profileContent: typeof args.profileContent === 'object'
                ? args.profileContent.id
                : args.profileContent,
                }

    return update.definition.url
            .replace('{profileContent}', parsedArgs.profileContent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::update
 * @see app/Http/Controllers/Admin/ProfileContentController.php:88
 * @route '/admin/profile-content/{profileContent}'
 */
update.put = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::update
 * @see app/Http/Controllers/Admin/ProfileContentController.php:88
 * @route '/admin/profile-content/{profileContent}'
 */
    const updateForm = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::update
 * @see app/Http/Controllers/Admin/ProfileContentController.php:88
 * @route '/admin/profile-content/{profileContent}'
 */
        updateForm.put = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ProfileContentController::destroy
 * @see app/Http/Controllers/Admin/ProfileContentController.php:116
 * @route '/admin/profile-content/{profileContent}'
 */
export const destroy = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/profile-content/{profileContent}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::destroy
 * @see app/Http/Controllers/Admin/ProfileContentController.php:116
 * @route '/admin/profile-content/{profileContent}'
 */
destroy.url = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profileContent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { profileContent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profileContent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profileContent: typeof args.profileContent === 'object'
                ? args.profileContent.id
                : args.profileContent,
                }

    return destroy.definition.url
            .replace('{profileContent}', parsedArgs.profileContent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::destroy
 * @see app/Http/Controllers/Admin/ProfileContentController.php:116
 * @route '/admin/profile-content/{profileContent}'
 */
destroy.delete = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::destroy
 * @see app/Http/Controllers/Admin/ProfileContentController.php:116
 * @route '/admin/profile-content/{profileContent}'
 */
    const destroyForm = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::destroy
 * @see app/Http/Controllers/Admin/ProfileContentController.php:116
 * @route '/admin/profile-content/{profileContent}'
 */
        destroyForm.delete = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\ProfileContentController::toggleActive
 * @see app/Http/Controllers/Admin/ProfileContentController.php:132
 * @route '/admin/profile-content/{profileContent}/toggle-active'
 */
export const toggleActive = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/profile-content/{profileContent}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::toggleActive
 * @see app/Http/Controllers/Admin/ProfileContentController.php:132
 * @route '/admin/profile-content/{profileContent}/toggle-active'
 */
toggleActive.url = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profileContent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { profileContent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profileContent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profileContent: typeof args.profileContent === 'object'
                ? args.profileContent.id
                : args.profileContent,
                }

    return toggleActive.definition.url
            .replace('{profileContent}', parsedArgs.profileContent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileContentController::toggleActive
 * @see app/Http/Controllers/Admin/ProfileContentController.php:132
 * @route '/admin/profile-content/{profileContent}/toggle-active'
 */
toggleActive.post = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileContentController::toggleActive
 * @see app/Http/Controllers/Admin/ProfileContentController.php:132
 * @route '/admin/profile-content/{profileContent}/toggle-active'
 */
    const toggleActiveForm = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileContentController::toggleActive
 * @see app/Http/Controllers/Admin/ProfileContentController.php:132
 * @route '/admin/profile-content/{profileContent}/toggle-active'
 */
        toggleActiveForm.post = (args: { profileContent: number | { id: number } } | [profileContent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, options),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const profileContent = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggleActive: Object.assign(toggleActive, toggleActive),
}

export default profileContent