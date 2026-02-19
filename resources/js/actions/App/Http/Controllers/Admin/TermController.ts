import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/terms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TermController::index
 * @see app/Http/Controllers/Admin/TermController.php:13
 * @route '/admin/terms'
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
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/terms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TermController::create
 * @see app/Http/Controllers/Admin/TermController.php:30
 * @route '/admin/terms/create'
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
* @see \App\Http\Controllers\Admin\TermController::store
 * @see app/Http/Controllers/Admin/TermController.php:39
 * @route '/admin/terms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/terms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TermController::store
 * @see app/Http/Controllers/Admin/TermController.php:39
 * @route '/admin/terms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::store
 * @see app/Http/Controllers/Admin/TermController.php:39
 * @route '/admin/terms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::store
 * @see app/Http/Controllers/Admin/TermController.php:39
 * @route '/admin/terms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::store
 * @see app/Http/Controllers/Admin/TermController.php:39
 * @route '/admin/terms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
export const edit = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/terms/{term}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
edit.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return edit.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
edit.get = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
edit.head = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
    const editForm = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
        editForm.get = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TermController::edit
 * @see app/Http/Controllers/Admin/TermController.php:60
 * @route '/admin/terms/{term}/edit'
 */
        editForm.head = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TermController::update
 * @see app/Http/Controllers/Admin/TermController.php:70
 * @route '/admin/terms/{term}'
 */
export const update = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/terms/{term}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TermController::update
 * @see app/Http/Controllers/Admin/TermController.php:70
 * @route '/admin/terms/{term}'
 */
update.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return update.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::update
 * @see app/Http/Controllers/Admin/TermController.php:70
 * @route '/admin/terms/{term}'
 */
update.put = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::update
 * @see app/Http/Controllers/Admin/TermController.php:70
 * @route '/admin/terms/{term}'
 */
    const updateForm = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::update
 * @see app/Http/Controllers/Admin/TermController.php:70
 * @route '/admin/terms/{term}'
 */
        updateForm.put = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TermController::destroy
 * @see app/Http/Controllers/Admin/TermController.php:91
 * @route '/admin/terms/{term}'
 */
export const destroy = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/terms/{term}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TermController::destroy
 * @see app/Http/Controllers/Admin/TermController.php:91
 * @route '/admin/terms/{term}'
 */
destroy.url = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { term: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { term: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    term: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        term: typeof args.term === 'object'
                ? args.term.id
                : args.term,
                }

    return destroy.definition.url
            .replace('{term}', parsedArgs.term.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TermController::destroy
 * @see app/Http/Controllers/Admin/TermController.php:91
 * @route '/admin/terms/{term}'
 */
destroy.delete = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TermController::destroy
 * @see app/Http/Controllers/Admin/TermController.php:91
 * @route '/admin/terms/{term}'
 */
    const destroyForm = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TermController::destroy
 * @see app/Http/Controllers/Admin/TermController.php:91
 * @route '/admin/terms/{term}'
 */
        destroyForm.delete = (args: { term: number | { id: number } } | [term: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TermController = { index, create, store, edit, update, destroy }

export default TermController