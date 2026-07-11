package dto

type UpdateTodoRequest struct {
	Body      *string `json:"body,omitempty"`
	Completed *bool   `json:"completed,omitempty"`
}
