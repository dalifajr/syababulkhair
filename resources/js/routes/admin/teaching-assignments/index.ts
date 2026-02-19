import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/teaching-assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::index
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:16
 * @route '/admin/teaching-assignments'
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
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/teaching-assignments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::create
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:32
 * @route '/admin/teaching-assignments/create'
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
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::store
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:47
 * @route '/admin/teaching-assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/teaching-assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::store
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:47
 * @route '/admin/teaching-assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::store
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:47
 * @route '/admin/teaching-assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::store
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:47
 * @route '/admin/teaching-assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::store
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:47
 * @route '/admin/teaching-assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
export const edit = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/teaching-assignments/{teachingAssignment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
edit.url = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teachingAssignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teachingAssignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teachingAssignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teachingAssignment: typeof args.teachingAssignment === 'object'
                ? args.teachingAssignment.id
                : args.teachingAssignment,
                }

    return edit.definition.url
            .replace('{teachingAssignment}', parsedArgs.teachingAssignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
edit.get = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
edit.head = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
    const editForm = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
        editForm.get = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::edit
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:72
 * @route '/admin/teaching-assignments/{teachingAssignment}/edit'
 */
        editForm.head = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::update
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:88
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
export const update = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/teaching-assignments/{teachingAssignment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::update
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:88
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
update.url = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teachingAssignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teachingAssignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teachingAssignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teachingAssignment: typeof args.teachingAssignment === 'object'
                ? args.teachingAssignment.id
                : args.teachingAssignment,
                }

    return update.definition.url
            .replace('{teachingAssignment}', parsedArgs.teachingAssignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::update
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:88
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
update.put = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::update
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:88
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
    const updateForm = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::update
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:88
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
        updateForm.put = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::destroy
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:103
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
export const destroy = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/teaching-assignments/{teachingAssignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::destroy
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:103
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
destroy.url = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teachingAssignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teachingAssignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teachingAssignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teachingAssignment: typeof args.teachingAssignment === 'object'
                ? args.teachingAssignment.id
                : args.teachingAssignment,
                }

    return destroy.definition.url
            .replace('{teachingAssignment}', parsedArgs.teachingAssignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::destroy
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:103
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
destroy.delete = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::destroy
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:103
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
    const destroyForm = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeachingAssignmentController::destroy
 * @see app/Http/Controllers/Admin/TeachingAssignmentController.php:103
 * @route '/admin/teaching-assignments/{teachingAssignment}'
 */
        destroyForm.delete = (args: { teachingAssignment: number | { id: number } } | [teachingAssignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const teachingAssignments = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default teachingAssignments