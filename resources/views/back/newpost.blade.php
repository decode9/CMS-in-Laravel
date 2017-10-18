@extends('layouts.backend')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                @if($edit)
                    <div class="panel-heading">Modify New</div>
                @else
                    <div class="panel-heading">Register new New</div>
                @endif


                <div class="panel-body">
                        <div class="previewImg">
                            @if($edit)
                                <img id="previewImage" src="{{$post->picture_path}}" alt="" width="auto" height="auto" >
                            @else
                                <img id="previewImage" src="" alt="" width="auto" height="auto" style="display:none;">
                            @endif
                        </div>
                    @if($edit)
                        <form class="form-horizontal" method="POST" action="{{ route('update.news', $post->id) }}" enctype="multipart/form-data">
                    @else
                        <form class="form-horizontal" method="POST" action="{{ route('store.news') }}" enctype="multipart/form-data">
                    @endif
                        {{ csrf_field() }}
                        <div class="form-group{{ $errors->has('picture') ? ' has-error' : '' }}">
                            <label for="picture" class="col-md-4 control-label">Picture</label>
                            <div class="col-md-6">
                                @if($edit)
                                    <input id="picture" name="picture" type="file" class="custom-file-input" required>
                                @else
                                    <input id="picture" name="picture" type="file" class="custom-file-input" required>
                                @endif


                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('picture') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                @if($edit)
                                    <input id="name" type="text" class="form-control" name="name" value="{{ $post->name }}" required autofocus>
                                @else
                                    <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>
                                @endif


                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
                            <label for="content" class="col-md-4 control-label">Content</label>

                            <div class="col-md-6">
                                @if($edit)
                                    <textarea class="form-control" id="contentnews" name="content" rows="3">{{$post->content}}</textarea>
                                @else
                                    <textarea class="form-control" id="contentnews" name="content" rows="3"></textarea>
                                @endif

                                @if ($errors->has('content'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('content') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Save News
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
