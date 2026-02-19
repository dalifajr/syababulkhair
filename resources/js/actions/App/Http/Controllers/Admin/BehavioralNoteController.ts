import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/behavioral-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::index
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:16
 * @route '/admin/behavioral-notes'
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
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/behavioral-notes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::create
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:42
 * @route '/admin/behavioral-notes/create'
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
* @see \App\Http\Controllers\Admin\BehavioralNoteController::store
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:53
 * @route '/admin/behavioral-notes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/behavioral-notes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::store
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:53
 * @route '/admin/behavioral-notes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::store
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:53
 * @route '/admin/behavioral-notes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::store
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:53
 * @route '/admin/behavioral-notes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::store
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:53
 * @route '/admin/behavioral-notes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
export const edit = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/behavioral-notes/{behavioralNote}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
edit.url = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { behavioralNote: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { behavioralNote: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    behavioralNote: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        behavioralNote: typeof args.behavioralNote === 'object'
                ? args.behavioralNote.id
                : args.behavioralNote,
                }

    return edit.definition.url
            .replace('{behavioralNote}', parsedArgs.behavioralNote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
edit.get = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
edit.head = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
    const editForm = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
        editForm.get = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::edit
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:71
 * @route '/admin/behavioral-notes/{behavioralNote}/edit'
 */
        editForm.head = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BehavioralNoteController::update
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:82
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
export const update = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/behavioral-notes/{behavioralNote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::update
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:82
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
update.url = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { behavioralNote: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { behavioralNote: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    behavioralNote: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        behavioralNote: typeof args.behavioralNote === 'object'
                ? args.behavioralNote.id
                : args.behavioralNote,
                }

    return update.definition.url
            .replace('{behavioralNote}', parsedArgs.behavioralNote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::update
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:82
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
update.put = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::update
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:82
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
    const updateForm = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::update
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:82
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
        updateForm.put = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BehavioralNoteController::destroy
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:97
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
export const destroy = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/behavioral-notes/{behavioralNote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::destroy
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:97
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
destroy.url = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { behavioralNote: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { behavioralNote: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    behavioralNote: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        behavioralNote: typeof args.behavioralNote === 'object'
                ? args.behavioralNote.id
                : args.behavioralNote,
                }

    return destroy.definition.url
            .replace('{behavioralNote}', parsedArgs.behavioralNote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::destroy
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:97
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
destroy.delete = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::destroy
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:97
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
    const destroyForm = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BehavioralNoteController::destroy
 * @see app/Http/Controllers/Admin/BehavioralNoteController.php:97
 * @route '/admin/behavioral-notes/{behavioralNote}'
 */
        destroyForm.delete = (args: { behavioralNote: number | { id: number } } | [behavioralNote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const BehavioralNoteController = { index, create, store, edit, update, destroy }

export default BehavioralNoteController